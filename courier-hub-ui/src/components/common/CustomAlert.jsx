import { Alert, AlertTitle, IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const CustomAlert = ({ title, alertConfig, handleClose}) => {

    return (
        <Snackbar
            open={alertConfig?.open}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
        >
            <Alert
                severity={alertConfig?.isError ? 'error': 'success'}
                sx={{ minWidth: 300 }}
                action={
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <AlertTitle>{title}</AlertTitle>
                {alertConfig?.message}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert
