import { Alert, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth'

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {

        // console.log(email)
        fetch('https://peaceful-atoll-71425.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    setSuccess(true)
                }
            })
        e.preventDefault()
    }
    return (
        <div>
            <h1>Make An Admin</h1>
            <form onSubmit={handleAdminSubmit}>
                <TextField
                    sx={{ width: "50%" }}
                    label="Email"
                    type="email"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
            {success && <Alert severity="success">Made Admin successfully!</Alert>}
        </div>
    );
};

export default MakeAdmin;