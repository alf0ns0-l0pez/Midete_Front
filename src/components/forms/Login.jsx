import { useState } from 'react';
import { Dialog, DialogPanel, TextInput } from '@tremor/react';
import { useUserToggleContext } from '../../context/userProvided';
import useFetchLogIn from '../../hooks/useFetchLogin';

export default function Login(props) {
    const { isOpen, clickHandle } = props;
    const [fetchBody, setFetchBody] = useState({
        username: '', 
        password: ''
    });
    const changeLogin = useUserToggleContext();
    const host = import.meta.env.VITE_API_HOST;
    console.log(host)
    const loginEndHandle = (userReqInfo) =>{
        changeLogin(userReqInfo);
        clickHandle(false);
    }
    const loginRequest = useFetchLogIn(
        `${host}/auth/login`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(fetchBody)
        },
        loginEndHandle
    )

    const handleChange = (key, value) => {
        setFetchBody({
            ...fetchBody,
            [key]: value
        });
    };
    return (
        <Dialog open={isOpen} onClose={(val) => clickHandle(val)} static={true}>
            <DialogPanel>
                <h3 className="text-center text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Log in
                </h3>
                <div>
                    <label
                        htmlFor="email"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                        User Name
                    </label>
                    <TextInput
                        onChange={(e) => handleChange("username",e.target.value)}
                        value={fetchBody.username}
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="john@company.com"
                        className="mt-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                    >
                        Password
                    </label>
                    <TextInput
                        onChange={(e) => handleChange("password",e.target.value)}
                        value={fetchBody.password}
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="password"
                        placeholder="password"
                        className="mt-2"
                    />
                </div>
                <button
                    onClick={loginRequest.handleRequest}
                    type="button"
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-tremor-brand py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
                >
                    Sign in
                </button>
            </DialogPanel>
        </Dialog>
    );
}