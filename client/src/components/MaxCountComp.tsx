import { maxCountsBySection } from '@/constants';

type Props = {
  count: number;
  type?: maxCountType;
}

const MaxCountComp = ({ count, type = "default" }: Props) => {
  return (
    <div className="flex gap-2 items-center mt-3 max-desktop:flex-col max-desktop:gap-0">
      <p className="text-xs text-muted-foreground">There are {count} items.</p>
      <p className="text-xs text-muted-foreground">(Maximum item length is {maxCountsBySection[type]})</p>
    </div>
  )
}

export default MaxCountComp