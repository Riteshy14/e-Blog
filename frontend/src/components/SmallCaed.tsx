import { motion } from "framer-motion";

interface cardtype{
  header:string;
  content:string;
  obj:string;
  point1:string;
  point2:string;
  point3:string;
  bg:string
}

export function SmallCard({header,content,obj,point1,point2,point3,bg}:cardtype) {

  type textvaraiantType ={
    initial: { opacity: number, y: number }, 
    scroll: {
      opacity: number,
      y: number,
      transition: any
    },
    hover: {
      opacity: number,
      y: number, 
      transition: any
    }
  }

    type shapevaraiantType ={
    initial: { opacity: number, scale: number }, 
    scroll: {
      opacity: number,
      scale: number,
      transition: any
    },
    hover: {
      scale: number, 
      transition: any
    }
  }

  const textVariants:textvaraiantType = {
    initial: { opacity: 0, y: 40 }, 
    scroll: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.50, ease: "easeOut" }
    },
    hover: {
      opacity: 1,
      y: 0, 
      transition: { duration: 0.55, ease: "easeOut" }
    }
  };

  const hoverVarient:any = {
      initial: { opacity: 0, y: 40 },
      hover: {
      opacity: 1,
      y: 0, 
      transition: { duration: 0.55, ease: "easeOut" }
    }
  }
  const shapeVariants:shapevaraiantType = {
    initial: { opacity: 0, scale: 0.7 },
    scroll: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" }
    },
    hover: {
      scale: 1.15,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      initial="initial"
      whileInView="scroll"    
      whileHover="hover"      
      viewport={{ once: false, amount: 0.3 }}
      className={`relative overflow-hidden bg-linear-to-r
                 ${bg}
                 px-6 py-5 sm:px-10`}
    >
      <div className="flex items-center justify-between gap-10">

        <div className="max-w-xl space-y-4">
          <h3 className="text-2xl font-bold sm:text-3xl ">
            {header}
          </h3>

          <p className="text-md text-white sm:text-base">
           {content}
          </p>

          <motion.div
            variants={textVariants}
            className="space-y-3"
          >
          <motion.div
          variants={hoverVarient}>
            <h6 className="text-xs font-semibold uppercase tracking-[0.2em] pt-1 pb-2 text-white">
              {obj}
            </h6>

            <div className={`text-xs text-purple-100 sm:text-base `}>
              <p>• {point1}</p>
              <p>• {point2}</p>
              <p>• {point3}</p>
            </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={shapeVariants}
          className="items-center justify-center gap-4 pr-4 hidden sm:flex"
        >
          <div className="h-18 w-18 rounded-xl bg-purple-800 shadow-lg" />
          <div className="h-14 w-14 rounded-xl bg-yellow-400 shadow-lg" />
          <div className="h-11 w-11 rounded-full bg-green-600 shadow-lg" />
        </motion.div>

      </div>
    </motion.section>
  );
}
