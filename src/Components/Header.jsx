import React from 'react'
import Button from '@mui/material/Button';

function Header() {
    return (
        <div>
            <div style={{ marginLeft: '1380px' }}>
                <br />
                <Button variant="outlined" className='fw-bolder text-dark' style={{ borderColor: 'black' }}>Logout <i class="fa-solid fa-power-off ms-2"></i></Button>
            </div>
        </div>
    )
}

export default Header