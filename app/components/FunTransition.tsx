// import { animated, useSpring } from "@react-spring/web"
// import React, { forwardRef } from "react"
// import { Transition } from "react-transition-group"
// import { TransitionProps } from "react-transition-group/Transition"

// const SHOW_STATE = { opacity: 1, y: 0 }
// const HIDE_STATE = { opacity: 0, y: 30 }

// const FunTransition = forwardRef<HTMLDivElement, TransitionProps>(function FunTransition(
//   props,
//   ref
// ) {
//   const { in: inProp = false, onEnter, onExited, children, ...other } = props

//   const style = useSpring({
//     from: HIDE_STATE,
//     onRest: () => {
//       if (!inProp && onExited) {
//         onExited(ref)
//       }
//     },
//     onStart: () => {
//       if (inProp && onEnter) {
//         onEnter(ref, true)
//       }
//     },
//     to: inProp ? SHOW_STATE : HIDE_STATE,
//   })

//   return (
//     <Transition in={inProp} {...other}>
//       {(state) => (
//         <animated.div style={style}>
//           {React.cloneElement(children, {
//             state,
//           })}
//         </animated.div>
//       )}
//     </Transition>
//   )
// })
// FunTransition.displayName = "FunTransition"

// export { FunTransition }
