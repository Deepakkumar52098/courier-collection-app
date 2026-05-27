import { Box, Button } from '@mui/material'

const PackageDetailsActions = ({ handleUpdate, mode }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2
            }}>
            <Button
                sx={{
                    background: 'green',
                    color: 'white'
                }}
                onClick={handleUpdate}>
                {mode === 'Edit' ? 'Update' : 'Add'}
            </Button>
        </Box>
    )
}

export default PackageDetailsActions
