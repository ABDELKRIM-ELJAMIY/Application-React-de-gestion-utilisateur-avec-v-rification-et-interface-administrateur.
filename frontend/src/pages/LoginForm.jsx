import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaRegSmileBeam } from 'react-icons/fa';

const schema = yup.object().shape({
    email: yup.string().email('Email invalide').required('Email requis'),
    password: yup.string().required('Mot de passe requis'),
});

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="min-h-screen bg-[#F5EEDA] flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-[#F5EEDA] p-3 rounded-full">
                        <FaRegSmileBeam className="text-2xl text-[#40C4A0]" />
                    </div>

                    <h2 className="text-[#006D5B] text-xl font-bold mt-3">Bon retour!</h2>
                    <p className="text-sm text-gray-600">Connecte-toi pour continuer</p>
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

                <div className="mb-6">
                    <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                        <FiLock className="text-[#40C4A0]" /> Mot de passe
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Entre ton mot de passe"
                        className="w-full p-2 border rounded bg-[#F9FBEF] mt-1"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    <div className="text-right mt-1">
                        <a href="/forgot-password" className="text-sm text-[#006D5B] hover:underline">
                            Mot de passe oublié?
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#006D5B] hover:bg-[#004D3F] text-white font-semibold py-2 rounded"
                >
                    Se connecter
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Tu n'as pas de compte?{' '}
                    <a href="/register" className="text-[#006D5B] font-medium">
                        Inscris-toi ici
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;