import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
  link?: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}

const CardWrapper = ({ link, title, desc, children }: Props) => {
  const navigate = useNavigate();
  return (
    <Card className='max-md:w-full'>
      <CardHeader>
        <CardTitle className='cursor-pointer' onClick={() => link && navigate(link)}>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default CardWrapper