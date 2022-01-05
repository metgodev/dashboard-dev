import { Button } from '@mui/material'

export default (div, text) => {
    
    const printAsPdf = () => {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        const pri = iframe.contentWindow;
        pri.document.open();
        pri.document.write(document.getElementById(div).innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
        pri.onafterprint = () => { document.body.removeChild(iframe); }
    }

    return(
        <Button onClick={printAsPdf}>{text}</Button>
    )
}