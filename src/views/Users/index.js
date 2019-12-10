import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link, Route, Redirect } from 'react-router-dom';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import './index.css'
import { TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));
  const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "blue",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  function createData(id, name, email) {
    return { id, name, email };
  }
  
  const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

  const useStyles2 = makeStyles({
    root: {
      width: '90%',
    },
    table: {
      minWidth: 200,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    prflStyle: {
        display: 'flex',
      },
  });

export default function Users() {
  
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [value, setValue] = React.useState(2);
    const[showDetail, setShowDetail] = React.useState(false)
    
    const [state, setState] = React.useState({
   user:[]
  });
  const[userName, setUserName] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 const handleChange =(e) => {
  setState(e.target.value);
}
  const  handleClick = (event, id) => {
    console.log('event', id)
    setState({user: id})
    setShowDetail({showDetail: true})
    // axios.get(`/users/${id}`)
    // .then(({ data: user }) => {
    //   setState({ user });
    // }); 
    }
 const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <React.Fragment>
          <Grid container spacing={12} justify="center">
          <Grid item xs={6}>
           <FormControl className={classes.formControl}>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Top 10 Users</option>
          <option value={20}>Top 100 Users</option>
          <option value={30}>Bottom 10 Users</option>
          <option value={30}>Bottom 100 Users</option>
        </NativeSelect>
      </FormControl>
    
      <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Id</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.id}>
                <TableCell align="right" onClick={(event) => 
                    handleClick(event ,row.id)}>
                <Link to={`/users/${row.id}`}>{row.id}</Link>  
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
    </Grid>
    <Grid item xs={6} style={{ display: (showDetail ? 'block' : 'none') }}>
            <Grid floated='left'>
              <label>{state.user}</label><br />
              <FormControl component="fieldset">
                <FormGroup>
                <FormControlLabel
                    value="start"
                    control={<Switch color="secondary" />}
                    label="Disable User"
                    labelPlacement="start"
                    />
                </FormGroup>
            </FormControl> <br />
            <Button variant="outlined" color="blue" onClick={handleClickOpen}>
            Reset Password
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to reset password?"}</DialogTitle>
                    <DialogActions>
                    <Button onClick={handleClose} color="blue" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        No
                    </Button>
                    </DialogActions>
                </Dialog> <br /> <br />
                 <TextField
                label="No.Of orders"
                value={state.user}
                className={classes.textField}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                variant="outlined"
                /><br /> <br /> 
                <TextField
                           label='User Name' 
                           name='orders'
                           value={state.user}
                           onChange={handleChange}
                           /><br /> 
                <TextField
                           label='No.Of orders' 
                           name='orders'
                           defaultValue={state.user}
                           />
               <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rating</Typography>
                <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                />
            </Box>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Save
            </Button>
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure you want to save changes?"}</DialogTitle>
                    <DialogActions>
                    <Button onClick={handleClose} color="blue" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={handleClose} color="secondary">
                        No
                    </Button>
                    </DialogActions>
                </Dialog>
        </Grid>
        </Grid>
    </Grid>
      </React.Fragment>
  );
}