import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Collapse, Box } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

function HoldingsTable({ holdings }) {
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (assetClass) => {
    setExpandedRows((prevState) =>
      prevState.includes(assetClass)
        ? prevState.filter((ac) => ac !== assetClass)
        : [...prevState, assetClass]
    );
  };

  return (
    <div style={{ backgroundColor: '', minHeight: '100vh', padding: '20px' }}>
      <Table>
        <TableBody>
          {holdings.reduce((acc, holding) => {
            const index = acc.findIndex((group) => group.asset_class === holding.asset_class);
            if (index === -1) {
              acc.push({ asset_class: holding.asset_class, count: 1, holdings: [holding] });
            } else {
              acc[index].count++;
              acc[index].holdings.push(holding);
            }
            return acc;
          }, []).map((group, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell colSpan={7}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      aria-label={expandedRows.includes(group.asset_class) ? 'Collapse' : 'Expand'}
                      onClick={() => toggleRow(group.asset_class)}
                    >
                      {expandedRows.includes(group.asset_class) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    <strong>{`${group.asset_class} (${group.count})`}</strong>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7}>
                  <Collapse in={expandedRows.includes(group.asset_class)} timeout="auto" unmountOnExit>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Ticker</TableCell>
                          <TableCell>Average Price</TableCell>
                          <TableCell>Market Price</TableCell>
                          <TableCell>Latest Change (%)</TableCell>
                          <TableCell>Market Value (Base CCY)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.holdings.map((holding, index) => (
                          <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#E3F2FD' }, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginBottom: '8px' }}>
                            <TableCell>{holding.name}</TableCell>
                            <TableCell>{holding.ticker}</TableCell>
                            <TableCell>{holding.avg_price}</TableCell>
                            <TableCell>{holding.market_price}</TableCell>
                            <TableCell>{holding.latest_chg_pct}</TableCell>
                            <TableCell>{holding.market_value_ccy}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HoldingsTable;
