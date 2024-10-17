// Import Libraries
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';

// Import Icons
import { IoClose } from 'react-icons/io5';
import { IoMdImages } from 'react-icons/io';

const InventoriesCheckImageModal = ({ show, onHide, images, title, initialIndex = 0 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <IoMdImages size={26} className="m-2" />
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel selectedItem={currentImageIndex} onChange={(index) => setCurrentImageIndex(index)} showThumbs={false} showIndicators={true} dynamicHeight={true}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image.image_url} alt={`ครุภัณฑ์รูปภาพ ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    <IoClose className="m-1" size={16} />
                    {'ปิด'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InventoriesCheckImageModal;