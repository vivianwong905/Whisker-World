import { createTheme } from '@mui/material/styles';

const theme= createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#1a237e',
          light: '#3b417f',
          dark: '#0c113d',
        },
        secondary: {
          main: '#c70248',
          light: '#e43775',
        },
        background: {
          default: '#beebec',
          paper: 'white',
        },
      },
      typography: {
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
      },
      spacing: 7,
      overrides: {
        MuiSwitch: {
          root: {
            width: 42,
            height: 26,
            padding: 1,
            margin: 8,
          },
          switchBase: {
            padding: 1,
            '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + $track': {
                opacity: 1,
                border: 'none',
              },
            },
          },
          thumb: {
            width: 24,
            height: 24,
          },
          track: {
            borderRadius: 13,
            border: '1px solid #bdbdbd',
            backgroundColor: '#fafafa',
            opacity: 1,
            transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          },
        },
        MuiButton: { 
          root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            "&:hover":{bgcolor: "magenta", color:"white"},
            border: 1,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
            
            
        
            
          },
        },
    },
      props: {
        MuiButton: {
          size: 'small',
          
        },
        MuiButtonGroup: {
          size: 'small',
        },
        MuiCheckbox: {
          size: 'small',
        },
        MuiFab: {
          size: 'small',
        },
        MuiFormControl: {
          margin: 'dense',
          size: 'small',
        },
        MuiFormHelperText: {
          margin: 'dense',
        },
        MuiIconButton: {
          size: 'small',
        },
        MuiInputBase: {
          margin: 'dense',
        },
        MuiInputLabel: {
          margin: 'dense',
        },
        MuiRadio: {
          size: 'small',
        },
        MuiSwitch: {
          size: 'small',
        },
        MuiTextField: {
          margin: 'dense',
          size: 'small',
        },
        MuiTooltip: {
          arrow: true,
        },
        
        
      },
});

export default theme



