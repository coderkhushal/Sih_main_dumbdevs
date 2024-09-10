import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table,  TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Investmentdata from './investmentdata';


function Investments() {

  return (
    <Card>
    <CardHeader>
      <CardTitle>Your Investments</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Startup Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Equity</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <Investmentdata />
      </Table>
    </CardContent>
  </Card>
  )
}

export default Investments