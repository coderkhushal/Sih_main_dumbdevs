import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthContext } from '@/context/AuthContext';
import { getInvestments } from '@/actions/investor';
import { Investment } from '@/types';
import { ThreeDots } from 'react-loader-spinner';

function Investmentdata() {
    const { user, fetchUser, logout } = useAuthContext();
  const [investments,setInvestments] = useState<[Investment] | null>(null)
 
  useEffect(() => {
    fetchInvestment();
  }, [user, ]);
  const fetchInvestment = async () => {
    if (!user) {
      await fetchUser();
    }
    if (user) {
      const data = await getInvestments();
      if (data) {
        setInvestments(data);
        console.log("invest",data);
      } else {
      }
    }
  };

  if(!investments){
    return (
        <>
        <div className="h-4"></div>
        <div className="absolute w-full flex justify-center h-[10px] items-center">
            <ThreeDots height={20} color="#93c5fd" />
        </div>
        <div className="h-4"></div>
    </>
    )
  }

  return (
    <TableBody>
          {investments?.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell>{investment.startupName}</TableCell>
              <TableCell>${investment.amount.toLocaleString()}</TableCell>
              <TableCell>{investment.equity}%</TableCell>
              <TableCell>{new Date(investment.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
  )
}

export default Investmentdata