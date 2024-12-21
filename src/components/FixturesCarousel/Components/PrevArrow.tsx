import {ArrowLeft} from "lucide-react";

export function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{...style, display: 'block'}}
      onClick={onClick}
    >
      <div className="rounded-full bg-primary-foreground h-10 w-10 border-2 border-secondary-foreground flex">
        <ArrowLeft size={20} className={`text-secondary-foreground m-auto`}/>
      </div>
    </div>
  );
}
