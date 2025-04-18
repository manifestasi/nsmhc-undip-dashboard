import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToasterContext } from '@/contexts/ToasterContext';
import { IUpdatePenggunaPasswordPayload } from '@/types/Pengguna';

import penggunaServices from '@/services/pengguna.service';
import * as yup from 'yup';

const PenggunaEditPasswordSchema = yup.object().shape({
  email: yup.string().required('Email wajib diisi'),
  password: yup
    .string()
    .required('Kata Sandi wajib diisi')
    .min(8, 'Kata Sandi minimal 8 karakter'),
  password_confirmation: yup
    .string()
    .required('Konfirmasi Kata Sandi wajib diisi')
    .min(8, 'Kata Sandi minimal 8 karakter')
    .oneOf([yup.ref('password')], 'Konfirmasi Kata Sandi harus sama'),
});

const usePenggunaEditPassword = () => {
  const { query, isReady, push } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(PenggunaEditPasswordSchema),
  });

  const getPasswordPengguna = async () => {
    const res = await penggunaServices.getPasswordPengguna(`${query.id}`);

    const data = res.data.data;
    return data;
  };

  const { data: dataPasswordPengguna } = useQuery({
    queryKey: ['dataPasswordPengguna', query.id],
    queryFn: () => getPasswordPengguna(),
    enabled: isReady && !!query.id,
  });

  const updatePasswordPengguna = async (
    payload: IUpdatePenggunaPasswordPayload
  ) => {
    const data = await penggunaServices.updatePasswordPengguna(
      `${query.id}`,
      payload
    );
    return data.data;
  };

  const {
    mutate: mutateUpdatePasswordPengguna,
    isPending: isPendingUpdatePasswordPengguna,
  } = useMutation({
    mutationFn: (payload: IUpdatePenggunaPasswordPayload) =>
      updatePasswordPengguna(payload),
    onError: (error) => {
      setToaster({
        type: 'error',
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: 'success',
        message: 'Berhasil memperbarui data pengguna',
      });
      push('/dashboard/pengguna');
    },
  });

  const handleUpdatePasswordPengguna = (
    data: IUpdatePenggunaPasswordPayload
  ) => {
    mutateUpdatePasswordPengguna(data);
  };
  return {
    control,
    errors,
    isVisible,
    isVisibleConfirm,
    dataPasswordPengguna,
    isPendingUpdatePasswordPengguna,
    mutateUpdatePasswordPengguna,
    handleUpdatePasswordPengguna,
    setValue,
    handleSubmit,
    toggleVisibility,
    toggleVisibilityConfirm,
  };
};

export default usePenggunaEditPassword;
