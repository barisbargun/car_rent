import CardWrapper from './CardWrapper'
import { IStatisticCard } from '@/types/exports'


const StatisticCard = ({ data }: { data: IStatisticCard }) => {

  const Write = (count: number, text: string) => {
    return (
      <div key={`${text}${count}`} className='flex-center flex-col min-w-20 py-4'>
        <h3 className='text-6xl font-semibold'>{count}</h3>
        <p className='text-sm text-muted-foreground'>{text}</p>
      </div>
    )
  }

  return (
    <CardWrapper title={data.title} desc={data.desc} link={data.link}>
      <div className='flex items-center justify-evenly w-[350px] max-md:w-full'>
        {
          data.count.map((v, i) =>
            Write(v, data.names[i])
          )
        }
      </div>
    </CardWrapper>
  )
}

export default StatisticCard