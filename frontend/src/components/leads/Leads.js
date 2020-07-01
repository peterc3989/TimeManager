import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getLeads, deleteLead } from '../../actions/leads';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginLeft: '20%',
    marginRight: '20%',
    color: 'white',
  },
  tableRow: {
    background: 'linear-gradient(90deg, #e66465 30%, #9198e5 90%)',
  },
  tableItem: {
    fontSize: '16px',
    color: 'white',
  },
  button: {
    fontSize: '15px',
    color: 'white',
    textTransform: 'none',
    
  },
});

export default function Leads() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);

  useEffect(() => {
    dispatch(getLeads());
  });

  return (
    <div className={classes.tableContainer}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell className={classes.tableItem}>Activity</TableCell>
              <TableCell className={classes.tableItem} align="right">
                Hours
              </TableCell>
              <TableCell className={classes.tableItem} align="right">
                Minutes
              </TableCell>
              <TableCell className={classes.tableItem} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id} className={classes.tableRow}>
                <TableCell className={classes.tableItem} component="th" scope="row">
                  {lead.activity}
                </TableCell>
                <TableCell className={classes.tableItem} align="right">
                  {lead.hours}
                </TableCell>
                <TableCell className={classes.tableItem} align="right">
                  {lead.minutes}
                </TableCell>
                <TableCell className={classes.tableItem} align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => dispatch(deleteLead(lead.id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
