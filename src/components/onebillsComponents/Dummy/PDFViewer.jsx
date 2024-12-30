import React, { useEffect, useRef } from 'react';
import { pdfjs } from 'pdfjs-dist';

const PDFViewer = ({ pdfUrl }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchPDF = async () => {
            const pdf = await pdfjs.getDocument(pdfUrl).promise;
            const page = await pdf.getPage(1); // Render the first page
            const viewport = page.getViewport({ scale: 1 });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport,
            };

            await page.render(renderContext).promise;
        };

        fetchPDF();
    }, [pdfUrl]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto' }} />;
};

export default PDFViewer;
