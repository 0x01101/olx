import styles from "@/app/ui/elements/footer.module.css";

export function OLXbg (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"
         className={styles.partnerLogo}>
      <defs>
        <filter id="bulgariaFlag_svg__a" width="150%" height="172.7%"
                x="-25%"
                y="-36.4%" filterUnits="objectBoundingBox">
          <feOffset
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="0.5"></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1" result="shadowMatrixOuter1"
            values="0 0 0 0 0.407843137 0 0 0 0 0.407843137 0 0 0 0 0.407843137 0 0 0 0.3 0"></feColorMatrix>
          <feMerge>
            <feMergeNode
              in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode
              in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fill-rule="evenodd"
         filter="url(#bulgariaFlag_svg__a)"
         transform="translate(0 3)">
        <path
          fill="#458853" d="M0 .011h16v10.666H0z"></path>
        <path fill="#FFF" d="M0 .011h16v3.555H0z"></path>
        <path
          fill="#E42828" d="M0 7.122h16v3.555H0z"></path>
      </g>
    </svg>
  );
}

export function OLXro (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"
         className={styles.partnerLogo}>
      <defs>
        <filter id="romaniaFlag_svg__a" width="150%" height="172.7%"
                x="-25%"
                y="-36.4%" filterUnits="objectBoundingBox">
          <feOffset
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="0.5"></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1" result="shadowMatrixOuter1"
            values="0 0 0 0 0.407523777 0 0 0 0 0.407523777 0 0 0 0 0.407523777 0 0 0 0.304113855 0"></feColorMatrix>
          <feMerge>
            <feMergeNode
              in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g
        fill="none" fill-rule="evenodd" filter="url(#romaniaFlag_svg__a)" transform="translate(0 3)">
        <path
          fill="#FCDD0E" d="M0 .01h16v10.666H0z"></path>
        <path fill="#040677" d="M0 .01h5.333v10.667H0z"></path>
        <path
          fill="#EC0B0B" d="M10.667.01H16v10.667h-5.333z"></path>
      </g>
    </svg>
  );
}

export function OLXua (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"
         className={styles.partnerLogo}>
      <defs>
        <filter id="ukraineFlag_svg__a" width="150%" height="172.7%"
                x="-25%"
                y="-36.4%" filterUnits="objectBoundingBox">
          <feOffset
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="0.5"></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1" result="shadowMatrixOuter1"
            values="0 0 0 0 0.407843137 0 0 0 0 0.407843137 0 0 0 0 0.407843137 0 0 0 0.3 0"></feColorMatrix>
          <feMerge>
            <feMergeNode
              in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode
              in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fill-rule="evenodd"
         filter="url(#ukraineFlag_svg__a)"
         transform="translate(0 3)">
        <path
          fill="#F7D210" d="M0 .011h16v10.666H0z"></path>
        <path fill="#1762E7"
              d="M0 .011h16v5.333H0z"></path>
      </g>
    </svg>
  );
}

export function OLXpt (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"
         className={styles.partnerLogo}>
      <defs>
        <filter id="portugalFlag_svg__a" width="150%" height="172.7%"
                x="-25%"
                y="-36.4%" filterUnits="objectBoundingBox">
          <feOffset
            dy="1"
            in="SourceAlpha"
            result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="0.5"></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1" result="shadowMatrixOuter1"
            values="0 0 0 0 0.407843137 0 0 0 0 0.407843137 0 0 0 0 0.407843137 0 0 0 0.3 0"></feColorMatrix>
          <feMerge>
            <feMergeNode
              in="shadowMatrixOuter1"></feMergeNode>
            <feMergeNode
              in="SourceGraphic"></feMergeNode>
          </feMerge>
        </filter>
      </defs>
      <g fill="none" fill-rule="evenodd"
         filter="url(#portugalFlag_svg__a)"
         transform="translate(0 3)">
        <path
          fill="#F71111" d="M0 .011h16v10.666H0z"></path>
        <path fill="#288703"
              d="M6.145.011v10.666H0V.011z"></path>
        <circle
          cx="6.145" cy="5.344" r="2" fill="#F8D80C"></circle>
        <path fill="#F71111"
              d="M5.02 4.344v1.25a1.125 1.125 0 0 0 2.25 0v-1.25H5.02z"></path>
        <path
          fill="#F0F0F0" fill-rule="nonzero"
          d="M6.145 5.969a.375.375 0 0 1-.375-.375v-.5h.75v.5a.375.375 0 0 1-.375.375z"></path>
      </g>
    </svg>
  );
}

export function Fixlypl (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"
         className={styles.partnerLogo}>
      <g fill="none" fill-rule="evenodd">
        <path fill="#E7CB05"
              d="M0 0h16v16H0z"></path>
        <path
          d="m4.158 6.226 3.126 3.237a1.5 1.5 0 1 1-2.158 2.084L2 8.31l2.158-2.084zm2.167 3.693a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm6.914-4.17-4.913 4.793-.085-.327a3.042 3.042 0 0 0-1.229-1.752l4.452-4.38 1.775 1.666z"
          fill="#406367"></path>
      </g>
    </svg>
  );
}

export function Otodompl (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 308 320">
      <path fill="#192636"
            d="M204 321H1V1h308v320H204m56.346-47.998h5.993V55.336H49.469v217.666h210.877z"></path>
      <path
        fill="#00D670"
        d="M259.862 273.002H49.468V55.336H266.34v217.666h-6.477m-71.518-163.95c-21.98-11.29-43.633-10.788-64.58 2.423-29.435 18.566-37.256 59.188-17.192 87.923 20.363 29.162 60.961 35.806 88.76 14.527 36.07-27.611 32.883-80.036-6.988-104.873z"></path>
      <path
        fill="#192736"
        d="M188.662 109.24c39.553 24.65 42.74 77.074 6.67 104.685-27.799 21.28-68.397 14.635-88.76-14.527-20.064-28.735-12.243-69.357 17.192-87.923 20.947-13.211 42.6-13.714 64.898-2.236z"></path>
    </svg>
  );
}

export function Otomotopl (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1em"
         height="1em" viewBox="0 0 16 16" className={styles.partnerLogo}>
      <defs>
        <path id="otomotoLogo_svg__a"
              d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
      </defs>
      <g
        fill="none" fill-rule="evenodd">
        <path fill="#D8D8D8"
              d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm0 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
        <mask
          id="otomotoLogo_svg__b" fill="#fff">
          <use xlinkHref="#otomotoLogo_svg__a"></use>
        </mask>
        <use
          fill="#1345AE" xlinkHref="#otomotoLogo_svg__a"></use>
        <path fill="#A10F0F" d="M-3 0h16v9H-3z"
              mask="url(#otomotoLogo_svg__b)"
              transform="rotate(-46 5 4.5)"></path>
      </g>
    </svg>
  );
}

export function Obidopl (): JSX.Element
{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 554.2 563.7" xmlSpace="preserve" width="1em" height="1em"
         className={styles.partnerLogo}>
      <defs>
        <path
          id="obidoLogo_svg__a" d="M9.5 17.8h536v536H9.5z"></path>
      </defs>
      <defs>
        <path id="obidoLogo_svg__c"
              d="M99 286.4c0-98.4 79.7-178.2 178-178.2S455 188 455 286.4s-79.7 178.2-178 178.2S99 384.9 99 286.4zM277 19C129.5 19 10 138.8 10 286.4s119.5 267.2 267 267.2S544.2 434 544.2 286.4 424.5 19 277 19z"></path>
      </defs>
      <clipPath
        id="obidoLogo_svg__b">
        <use xlinkHref="#obidoLogo_svg__a"
             style={{ overflow: "visible" }}></use>
      </clipPath>
      <clipPath
        id="obidoLogo_svg__d" style={{ clipPath: "url(&quot;#obidoLogo_svg__b&quot;)" }}>
        <use
          xlinkHref="#obidoLogo_svg__c" style={{ overflow: "visible" }}></use>
      </clipPath>
      <path
        d="M0 9h554.2v554.7H0z"
        style={{ clipPath: "url(&quot;#obidoLogo_svg__d&quot;)", fill: "rgb(238, 97, 102)" }}></path>
      <defs>
        <path
          id="obidoLogo_svg__e" d="M9.5 17.8h536v536H9.5z"></path>
      </defs>
      <defs>
        <path id="obidoLogo_svg__g"
              d="M277 357.3h88.4c1.2 0 2.1-.8 2.1-1.9v-89.5c0-.2 0-.4-.2-.4 0-.2 0-.2-.2-.4 0-.2 0-.2-.2-.4l-88.4-89.1c0-.2-.2-.2-.2-.4h-.4c0-.2 0-.2-.2-.2H276.5c-.2 0-.2.2-.2.2-.2 0-.2 0-.2.2-.2 0-.2 0-.4.2l-88.2 89.1-.2.2c-.2.2-.2.2-.2.4-.2 0-.2.2-.2.4v89.7c0 1 .8 1.9 1.9 1.9H277z"></path>
      </defs>
      <clipPath
        id="obidoLogo_svg__f">
        <use xlinkHref="#obidoLogo_svg__e"
             style={{ overflow: "visible" }}></use>
      </clipPath>
      <clipPath
        id="obidoLogo_svg__h" style={{ clipPath: "url(&quot;#obidoLogo_svg__b&quot;)" }}>
        <use
          xlinkHref="#obidoLogo_svg__g" style={{ overflow: "visible" }}></use>
      </clipPath>
      <path
        d="M176.7 164.9h200.7v202.3H176.7z"
        style={{ clipPath: "url(&quot;#obidoLogo_svg__d&quot;)", fill: "rgb(238, 97, 102)" }}></path>
    </svg>
  );
}