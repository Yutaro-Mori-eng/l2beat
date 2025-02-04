import { useId } from 'react'
import { cn } from '~/utils/cn'
import type { SvgIconProps } from '../svg-icon'
import { SvgIcon } from '../svg-icon'

export function OVMIcon(props: SvgIconProps) {
  const gradientId = useId()

  return (
    <>
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="OVM icon"
        {...props}
        style={{ fill: `url(#${gradientId})` }}
        className={cn('dark:hidden', props.className)}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 3C0.895431 3 0 3.89543 0 5V19C0 20.1046 0.89543 21 2 21H22C23.1046 21 24 20.1046 24 19V5C24 3.89543 23.1046 3 22 3H2ZM7.55523 11.3392L7.35985 12.6034C7.29089 13.0899 7.1683 13.5573 6.99207 14.0055C6.81968 14.4499 6.58982 14.8464 6.3025 15.195C6.01517 15.5437 5.66464 15.8195 5.25089 16.0225C4.84098 16.2217 4.36785 16.3137 3.83151 16.2984C3.31816 16.2869 2.88909 16.1758 2.5443 15.9651C2.19952 15.7544 1.92943 15.4766 1.73405 15.1318C1.53867 14.7832 1.41034 14.3944 1.34904 13.9653C1.28774 13.5324 1.28391 13.0899 1.33755 12.6379L1.52718 11.3679C1.59614 10.8928 1.71681 10.4331 1.88921 9.98874C2.06543 9.54434 2.29912 9.14784 2.59028 8.79922C2.88143 8.44677 3.23197 8.17285 3.64188 7.97747C4.05563 7.77826 4.53067 7.68632 5.067 7.70164C5.57269 7.7093 5.99602 7.81849 6.33697 8.02919C6.68176 8.23989 6.95185 8.51764 7.14723 8.86243C7.34644 9.20722 7.47669 9.59606 7.53799 10.029C7.60311 10.458 7.60886 10.8948 7.55523 11.3392ZM5.41754 12.6379L5.61292 11.3506C5.63207 11.1859 5.65314 10.9905 5.67613 10.7645C5.69912 10.5347 5.69912 10.3086 5.67613 10.0864C5.65314 9.86423 5.5861 9.67651 5.475 9.52327C5.36391 9.37003 5.18576 9.28767 4.94058 9.27617C4.64943 9.25702 4.41574 9.31448 4.23951 9.44857C4.06329 9.57882 3.92346 9.75313 3.82002 9.9715C3.72042 10.186 3.64571 10.4178 3.59591 10.6668C3.54611 10.912 3.50588 11.1438 3.47523 11.3621L3.2856 12.6436L3.21664 13.2355C3.19366 13.4615 3.19174 13.6875 3.2109 13.9136C3.23005 14.1396 3.29518 14.3292 3.40628 14.4825C3.5212 14.6357 3.70318 14.7181 3.95219 14.7296C4.23185 14.7449 4.45979 14.6855 4.63602 14.5514C4.81608 14.4173 4.95782 14.2411 5.06126 14.0228C5.16853 13.8044 5.24706 13.5726 5.29686 13.3274C5.3505 13.0784 5.39072 12.8486 5.41754 12.6379ZM8.96656 16.1834H9.6274H10.3285H11.0468L14.6153 7.81657H12.4087L10.3598 13.6651L10.1273 7.81657H8.02988L8.96656 16.1834ZM17.6295 7.81657H16.756H16.1296H15.147L13.6989 16.1834H15.6125L15.9343 14.3158L16.3877 10.7294L16.8709 16.1834H18.1409L20.3711 11.0456L19.6867 14.1492L19.3247 16.1834H21.2555L22.7036 7.81657H21.7727H21.0831H20.1694L17.8881 13.6205L17.6295 7.81657Z"
        />
        <defs>
          <linearGradient
            id={gradientId}
            x1="24"
            y1="3"
            x2="0"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B00020" />
            <stop offset="1" stopColor="#D61459" />
          </linearGradient>
        </defs>
      </SvgIcon>
      <SvgIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        aria-label="OVM badge icon"
        {...props}
        className={cn('hidden dark:inline dark:fill-current', props.className)}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 3C0.895431 3 0 3.89543 0 5V19C0 20.1046 0.89543 21 2 21H22C23.1046 21 24 20.1046 24 19V5C24 3.89543 23.1046 3 22 3H2ZM7.55523 11.3392L7.35985 12.6034C7.29089 13.0899 7.1683 13.5573 6.99207 14.0055C6.81968 14.4499 6.58982 14.8464 6.3025 15.195C6.01517 15.5437 5.66464 15.8195 5.25089 16.0225C4.84098 16.2217 4.36785 16.3137 3.83151 16.2984C3.31816 16.2869 2.88909 16.1758 2.5443 15.9651C2.19952 15.7544 1.92943 15.4766 1.73405 15.1318C1.53867 14.7832 1.41034 14.3944 1.34904 13.9653C1.28774 13.5324 1.28391 13.0899 1.33755 12.6379L1.52718 11.3679C1.59614 10.8928 1.71681 10.4331 1.88921 9.98874C2.06543 9.54434 2.29912 9.14784 2.59028 8.79922C2.88143 8.44677 3.23197 8.17285 3.64188 7.97747C4.05563 7.77826 4.53067 7.68632 5.067 7.70164C5.57269 7.7093 5.99602 7.81849 6.33697 8.02919C6.68176 8.23989 6.95185 8.51764 7.14723 8.86243C7.34644 9.20722 7.47669 9.59606 7.53799 10.029C7.60311 10.458 7.60886 10.8948 7.55523 11.3392ZM5.41754 12.6379L5.61292 11.3506C5.63207 11.1859 5.65314 10.9905 5.67613 10.7645C5.69912 10.5347 5.69912 10.3086 5.67613 10.0864C5.65314 9.86423 5.5861 9.67651 5.475 9.52327C5.36391 9.37003 5.18576 9.28767 4.94058 9.27617C4.64943 9.25702 4.41574 9.31448 4.23951 9.44857C4.06329 9.57882 3.92346 9.75313 3.82002 9.9715C3.72042 10.186 3.64571 10.4178 3.59591 10.6668C3.54611 10.912 3.50588 11.1438 3.47523 11.3621L3.2856 12.6436L3.21664 13.2355C3.19366 13.4615 3.19174 13.6875 3.2109 13.9136C3.23005 14.1396 3.29518 14.3292 3.40628 14.4825C3.5212 14.6357 3.70318 14.7181 3.95219 14.7296C4.23185 14.7449 4.45979 14.6855 4.63602 14.5514C4.81608 14.4173 4.95782 14.2411 5.06126 14.0228C5.16853 13.8044 5.24706 13.5726 5.29686 13.3274C5.3505 13.0784 5.39072 12.8486 5.41754 12.6379ZM8.96656 16.1834H9.6274H10.3285H11.0468L14.6153 7.81657H12.4087L10.3598 13.6651L10.1273 7.81657H8.02988L8.96656 16.1834ZM17.6295 7.81657H16.756H16.1296H15.147L13.6989 16.1834H15.6125L15.9343 14.3158L16.3877 10.7294L16.8709 16.1834H18.1409L20.3711 11.0456L19.6867 14.1492L19.3247 16.1834H21.2555L22.7036 7.81657H21.7727H21.0831H20.1694L17.8881 13.6205L17.6295 7.81657Z"
        />
      </SvgIcon>
    </>
  )
}
