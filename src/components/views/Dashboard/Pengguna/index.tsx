import TableUI from '@/components/UI/Table';
import { PENGGUNA_HEADER_TABLE } from './Pengguna.constants';
import Image from 'next/image';
import { Key, ReactNode, useCallback, useEffect, useState } from 'react';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { RiEdit2Fill } from 'react-icons/ri';
import { FaUnlockAlt, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/router';
import usePengguna from './usePengguna';
import useChangeUrl from '@/hooks/useChangeUrl';

const Pengguna = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {
    dataAllPengguna,
    isLoadingAllPengguna,
    isRefetchAllPengguna,
    handleSearch,
  } = usePengguna();

  const { push, query, isReady } = useRouter();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (data: Record<string, unknown>, columnKey: Key, index: number) => {
      const cellValue = data[columnKey as keyof typeof data];
      switch (columnKey) {
        case 'no':
          const currentPage = query.page ? parseInt(query.page as string) : 1;
          const itemsPerPage = dataAllPengguna?.per_page || 8;
          const calculatedIndex = (currentPage - 1) * itemsPerPage + index + 1;
          return calculatedIndex;
        case 'foto':
          return (
            <div className="flex justify-center">
              {cellValue ? (
                <Image
                  src={cellValue as string}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="/images/illustration/default-user-foto.svg"
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              )}
            </div>
          );
        case 'name':
          return (
            <div className="w-[150px] lg:w-full ">
              <p className="truncate lg:truncate-none">
                {cellValue as ReactNode}
              </p>
            </div>
          );
        case 'last_job':
          return (
            <div className="w-[100px] lg:w-full ">
              <p className="truncate lg:truncate-none">
                {cellValue as ReactNode}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="flex gap-2 justify-center">
              <button type="button" className="bg-success p-1 rounded-lg">
                <FaEye
                  size={20}
                  className="text-brown-lighter"
                  onClick={() => push(`/dashboard/pengguna/detail/${data.id}`)}
                />
              </button>
              <button
                type="button"
                className="bg-blue p-1 rounded-lg"
                onClick={() =>
                  push(`/dashboard/pengguna/edit-profil/${data.id}`)
                }>
                <RiEdit2Fill size={20} className="text-brown-lighter" />
              </button>
              <button
                type="button"
                className="bg-secondary p-1 rounded-lg"
                onClick={() =>
                  push(`/dashboard/pengguna/edit-akun/${data.id}`)
                }>
                <FaUnlockAlt size={20} className="text-brown-lighter" />
              </button>
            </div>
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push]
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <TableUI
          columns={PENGGUNA_HEADER_TABLE}
          data={dataAllPengguna?.data_user || []}
          isLoading={isLoadingAllPengguna || isRefetchAllPengguna}
          emptyContent="Data tidak ditemukan"
          renderCell={renderCell}
          totalPages={dataAllPengguna?.last_page}
          onClickButtonTopContent={() => handleSearch(searchQuery)}
          setSearchQuery={setSearchQuery}
        />
      )}
    </section>
  );
};

export default Pengguna;
