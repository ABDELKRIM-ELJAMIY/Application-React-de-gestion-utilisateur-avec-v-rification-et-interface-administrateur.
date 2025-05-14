import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUser, FiMail, FiPhone, FiLock} from 'react-icons/fi';
import { FaRegSmileWink } from 'react-icons/fa';

const schema = yup.object().shape({
    fullname: yup.string().required('Nom complet requis'),
    email: yup.string().email('Email invalide').required('Email requis'),
    phone: yup.string().required('Téléphone requis'),
    password: yup
        .string()
        .min(6, 'Min 6 caracteres')
        .required('Mot de passe requis'),
    confirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
        .required('Confirmation requise'),
});

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);    };

    return (
        <div className="min-h-screen bg-[#F5EEDA] flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-[#F5EEDA] p-3 rounded-full">
                        <FaRegSmileWink className="text-2xl text-[#40C4A0]" />
                    </div>

                    <h2 className="text-[#006D5B] text-xl font-bold mt-3">Rejoins-nous !</h2>
                    <p className="text-sm text-gray-600">Crée ton compte pour commencer l'aventure</p>
                </div>

                
                <div className="mb-4">
                    <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <FiUser className="text-[#40C4A0]" /> Nom complet
                    </label>
                    <input
                        {...register('fullname')}
                        placeholder="Entre votre nom"
                        className="w-full p-2 border rounded bg-[#F9FBEF] mt-1"
                    />
                    {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <FiMail className="text-[#40C4A0]" /> Email
                    </label>
                    <input
                        {...register('email')}
                        placeholder="exemple@mail.com"
                        className="w-full p-2 border rounded bg-[#F9FBEF] mt-1"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <FiPhone className="text-[#40C4A0]" /> Téléphone
                    </label>
                    <input
                        {...register('phone')}
                        placeholder="0000000000"
                        className="w-full p-2 border rounded bg-[#F9FBEF] mt-1"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <FiLock className="text-[#40C4A0]" /> Mot de passe
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Choisis un mot de passe"
                        className="w-full p-2 border rounded bg-[#F9FBEF] mt-1"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div className="mb-6">
                    <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <FiLock className="text-[#40C4A0]" /> Confirmation
                    </label>
                    <input
                        type="password"
                        {...register('confirm')}
                        placeholder="Confirme ton mot de passe"
                        className="w-full p-2 border rounded bg-[#F9FBEF] mt-1"
                    />
                    {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#006D5B] hover:bg-[#004D3F] text-white font-semibold py-2 rounded"
                >
                    Créer mon compte
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Tu as déjà un compte ? <a href="/login" className="text-[#006D5B] font-medium">Connecte-toi ici</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
