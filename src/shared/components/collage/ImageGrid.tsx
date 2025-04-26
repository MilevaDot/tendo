import { Box, Image } from "@chakra-ui/react"
import { ImageGridProps } from "../../../declarations/WebsiteService"
import Masonry from 'react-masonry-css'
import './ImageStyle.css'

const ImageGrid = ({ imageList }:ImageGridProps) => {
    const breakpointColumnsObj = {
        default: imageList.length,
        1100: imageList.length,
        700: imageList.length,
    }
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {imageList.map((img, index) => (
                <Box key={index} mb={4} overflow="hidden" borderRadius="10px">
                    <Image
                        src={img.src}
                        alt={img.alt}
                        width="100%"
                        height={img.height}
                        objectFit="cover"
                        borderRadius="10px"
                        _hover={{
                            transform: 'scale(1.05)',
                            transition: 'transform 0.3s ease',
                            boxShadow: 'lg',
                        }}
                    />
                </Box>
            ))}
        </Masonry>
    )
}

export default ImageGrid