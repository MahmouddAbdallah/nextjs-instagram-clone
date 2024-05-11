import React from 'react'
interface IconsProps {
    className: string
}
export const InstagramIcon: React.FC<IconsProps> = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="132" height="39" viewBox="0 0 132 39" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M16.5768 9.82929C14.0865 7.98742 13.3775 8.89132 13.3343 9.57347V24.5387C13.3343 28.2676 16.0828 28.0118 16.9659 25.434C17.0505 25.3256 17.4183 24.1929 17.9273 22.6252C19.1276 18.9282 21.1134 12.8121 22.0242 12.0037C22.28 11.6996 22.2196 13.7257 22.1362 16.5256C22.0846 18.256 22.0242 20.2821 22.0242 22.2363C22.0242 27.1164 24.8343 26.4147 25.6558 25.9455C28.4212 23.7969 30.0497 20.58 31.1708 18.3655C31.7848 17.1527 32.2466 16.2404 32.6595 15.9688C37.8475 20.1642 36.6372 22.4069 35.3832 23.0038C34.4753 22.62 27.5426 21.2131 30.3249 24.9224C36.6071 27.7956 39.8727 23.278 41.5256 20.9911L41.5258 20.9911L41.5261 20.9907C41.7567 20.6715 41.9559 20.3959 42.1276 20.1898L43.8386 23.2792C46.4389 28.2085 48.9649 25.1647 50.8637 22.8766L50.864 22.8764C50.9358 22.7897 51.0069 22.7041 51.077 22.62C53.3068 25.4536 54.0463 26.2356 55.2523 26.349C56.8574 26.4996 58.0408 25.509 58.9326 24.7626C59.5539 24.2424 60.0335 23.8409 60.4154 24.027C62.2498 26.3083 65.6799 26.0243 67.2895 23.6433C67.6485 24.1744 68.0721 24.5698 68.5395 25.0064L68.5865 25.0503C70.4798 26.8191 72.8772 25.2497 74.5379 24.1626C74.9368 23.9013 75.2935 23.6679 75.5903 23.5154V25.434C72.1133 27.1164 68.0677 31.52 68.0677 34.2595C68.0677 41.0583 74.5527 39.5037 77.4061 36.0502C78.8828 34.2631 78.7617 31.8595 78.6424 29.495C78.5314 27.2904 78.4219 25.12 79.611 23.5154C81.5824 20.8549 83.9777 15.4146 84.9287 13.027C84.985 13.027 85.1139 13.021 85.288 13.0129C85.9191 12.9836 87.1442 12.9267 87.6524 13.027C87.8703 13.07 87.7932 14.1239 87.7206 15.1146C87.6859 15.587 87.6524 16.045 87.6524 16.3722C87.6524 16.8432 87.6508 17.2551 87.6495 17.6221C87.6412 19.9613 87.6394 20.4801 88.0664 22.8954C89.6228 27.3722 93.7483 25.6045 94.9156 23.5154C95.8235 26.4572 100.752 27.3525 103.346 22.7479C105.681 26.9688 108.145 26.2013 108.664 25.8176C108.934 25.6178 109.275 25.0014 109.576 24.4567C109.853 23.9557 110.096 23.5154 110.22 23.5154C110.428 23.5154 110.505 24.1745 110.35 25.0503C110.157 27.3272 114.525 27.3722 114.371 25.434C113.956 21.2386 115.149 13.7944 117.094 13.4107C116.576 16.1735 116.965 22.7479 118.521 23.7712C120.077 25.1782 121.504 25.0503 121.504 24.4107C121.504 17.8619 123.061 13.7944 124.098 13.4107L123.968 18.7828C123.657 23.5921 126.173 26.1361 128.249 25.9455C133.826 25.434 131.75 17.7596 130.972 19.6782C129.52 25.4084 128.205 23.0891 127.73 21.2131C127.773 17.8875 127.833 11.2107 127.73 11.1084C127.71 11.0887 127.684 11.0089 127.645 10.8886C127.429 10.2252 126.813 8.33369 124.617 8.55021C122.542 8.75486 120.813 14.3487 120.207 17.12C120.726 10.7246 119.948 8.2944 116.446 8.93393C115.859 9.19133 115.468 10.4847 115.06 11.8367C114.657 13.1722 114.237 14.565 113.592 15.0735C113.538 14.8569 113.629 13.9759 113.73 13.0026L113.731 13.0015C113.869 11.6755 114.024 10.1784 113.852 9.95719C112.555 8.2944 111.128 8.67812 110.22 9.06184C109.933 9.41597 109.964 10.1622 110.048 12.2124C110.117 13.8651 110.22 16.3651 110.22 20.1898C108.041 26.1246 106.632 23.7712 106.2 21.8526V9.95719C104.747 8.62696 103.087 9.40295 102.438 9.95719C98.2878 5.14787 94.4217 11.5117 93.6186 15.0735C93.3371 16.3221 93.2295 17.5037 94.0077 22.2363C92.2438 25.1014 90.9382 23.4301 90.5058 22.2363C89.9862 19.0153 90.6137 15.543 91.0267 13.2579C91.3351 11.5504 91.5239 10.5058 91.0246 10.7246C89.6757 9.80371 86.9175 10.3409 85.7069 10.7246C84.799 5.35252 79.3516 9.31766 82.4644 13.027C82.3606 15.7898 80.0001 19.6355 78.8328 21.2131V10.213C76.8613 8.37114 75.4175 9.44556 74.9418 10.213C70.3763 5.81299 66.3816 11.1084 65.9925 15.0735V21.5968C64.8252 25.434 63.3985 22.4921 63.3985 21.5968V10.213C60.6063 7.74421 59.8691 9.0863 59.3627 10.0079C59.3233 10.0794 59.2854 10.1485 59.2481 10.213C53.8007 4.84089 51.3364 10.213 50.4285 19.2944C47.8344 26.4572 46.5374 21.5968 46.5374 19.6782V8.4223H51.077C52.8409 7.09207 51.8121 5.9068 51.077 5.48043L46.5374 5.35252V1.00367C45.0848 -0.428889 43.0789 -0.019585 42.2573 0.364137V5.35252C41.09 5.35252 40.0524 5.35252 38.2366 5.48043C36.8348 6.13956 37.0942 7.67445 38.2366 8.16649H42.1276C42.2143 10.5115 42.3352 15.5851 42.1276 17.12C41.9201 18.6549 40.3118 20.4883 39.5336 21.2131C39.8068 18.6108 38.8667 17.8341 36.9827 16.2773C36.1811 15.6151 35.2089 14.8117 34.0862 13.6665C39.793 4.58508 27.4715 9.82929 31.1031 14.6898C29.9358 17.6316 26.1745 24.4107 25.7855 21.8526C25.6558 19.2944 25.6558 15.5851 25.6558 10.7246C22.3354 5.19903 18.2196 12.6859 16.5768 17.12C16.5768 16.4759 16.5639 15.6924 16.5504 14.8653C16.5208 13.0644 16.4879 11.0564 16.5768 9.82929ZM2.56917 10.5967C2.652 12.3942 3.63453 13.6461 4.19833 14.3645C4.51714 14.7707 4.70206 15.0063 4.51467 15.0735C3.08797 15.5851 -0.673353 15.0735 0.104876 8.80603C0.493943 5.6727 5.68195 -2.70565 10.2215 1.25949C10.6106 1.59933 10.2215 22.4921 9.96208 24.027C9.44328 27.0967 5.29285 29.7828 5.42257 29.0153C7.10424 22.3818 6.95055 15.1134 6.80235 8.10473C6.76077 6.13701 6.71958 4.18972 6.71958 2.28275C3.65162 2.28275 2.56917 8.34947 2.56917 10.5967ZM58.859 20.1898C58.4439 22.8503 57.1295 23.5154 56.5244 23.5154C55.2274 23.0038 54.8383 22.2363 54.3195 19.6782C53.8007 17.12 54.1898 13.5386 55.4868 12.1316C56.7838 10.7246 59.2481 12.1316 59.2481 13.027C59.2481 13.1453 59.2504 13.2994 59.253 13.4853C59.2711 14.7066 59.3093 17.3037 58.859 20.1898ZM72.5701 23.6002C73.1755 23.6002 74.4896 22.9351 74.9047 20.2746C75.355 17.3885 75.3169 14.7914 75.299 13.5701V13.5697V13.5693C75.2961 13.3837 75.2938 13.2299 75.2938 13.1118C75.2938 12.2165 72.8295 10.8095 71.5325 12.2165C70.2355 13.6234 69.8464 17.2048 70.3652 19.763C70.884 22.3211 71.2731 23.0886 72.5701 23.6002ZM75.2012 33.2363C75.2084 33.1651 75.2157 33.0951 75.2227 33.0257C75.3669 31.6226 75.472 30.6006 75.2012 28.6316C75.2012 27.628 72.3478 30.5502 71.4399 32.7246C70.532 34.8991 71.6993 36.9456 73.126 36.1781C74.4487 35.4667 74.7571 34.5524 75.1153 33.4898C75.1433 33.4064 75.1719 33.3217 75.2012 33.2363ZM99.8071 23.6002C100.647 23.7908 101.727 22.9351 102.142 20.2746C102.592 17.3885 102.554 14.7914 102.536 13.5701C102.533 13.3842 102.531 13.2301 102.531 13.1118C102.333 11.2559 100.067 10.8095 98.7695 12.2165C97.4725 13.6234 97.0834 17.2048 97.6022 19.763C98.121 22.3211 98.8315 23.4071 99.8071 23.6002Z" />
        </svg>
    )
}
export const SavedIcon: React.FC<IconsProps> = ({ className }) => {
    return (
        <svg className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <polygon fill='none' points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            </polygon>
        </svg>
    )
}
export const TagIcon: React.FC<IconsProps> = ({ className }) => {
    return (
        <svg className={className} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            </path>
            <path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            </path>
            <circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
            </circle>
        </svg>
    )
}
export const HeartIcon: React.FC<IconsProps> = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="64" height="56" viewBox="0 0 64 56" fill="none">
            <path d="M46.1333 0C40.1333 0 35.6 2.4 32 7.46667C28.4 2.53333 23.8667 0.133334 17.8667 0.133334C8 1.88748e-07 0 8.66667 0 19.3333C0 29.0667 7.2 35.3333 14.1333 41.3333C14.9333 42 15.8667 42.8 16.6667 43.6L19.7333 46.2667C25.6 51.4667 28.5333 54.1333 29.8667 54.9333C30.5333 55.3333 31.3333 55.6 32 55.6C32.6667 55.6 33.4667 55.3333 34.1333 54.9333C35.4667 54.1333 37.8667 52 44.5333 45.8667L47.2 43.4667C48.1333 42.6667 48.9333 41.8667 49.8667 41.2C56.9333 35.3333 64 29.2 64 19.3333C64 8.66667 56 0 46.1333 0Z" fill="url(#paint0_linear_13_3)" />
            <defs>
                <linearGradient id="paint0_linear_13_3" x1="-2.37078" y1="-0.747505" x2="50.0549" y2="35.9614" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF7A00" />
                    <stop offset="0.4" stopColor="#FF0169" />
                    <stop offset="1" stopColor="#D300C5" />
                </linearGradient>
            </defs>
        </svg>
    )
}
export const CommentIcon: React.FC<IconsProps> = ({ className }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className={className} viewBox="0 0 22 22" fill="none">
            <path d="M19.6444 15.9944C20.8595 13.8925 21.2678 11.4202 20.7931 9.03916C20.3184 6.65816 18.9932 4.53141 17.0649 3.05622C15.1366 1.58103 12.7372 0.858298 10.3149 1.02305C7.89265 1.1878 5.61321 2.22875 3.90242 3.95146C2.19163 5.67416 1.16651 7.96077 1.01858 10.3841C0.870644 12.8075 1.61001 15.2018 3.09855 17.1198C4.58708 19.0378 6.72298 20.3483 9.10721 20.8065C11.4915 21.2646 13.9609 20.8391 16.0544 19.6094L20.9884 20.9864L19.6444 15.9944Z" strokeLinejoin="round" />
        </svg>
    )
}
export const MessagesIcon: React.FC<IconsProps> = ({ className }) => {
    return (
        <svg aria-label="" className={className} fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96">
            <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
        </svg>
    )
}