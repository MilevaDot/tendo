import { Box, Image } from "@chakra-ui/react"
import { ImageGridProps } from "../../../declarations/WebsiteService"
import Masonry from 'react-masonry-css'
import './ImageStyle.css'

const ImageGrid = ({ imageList }:ImageGridProps) => {

    const column1 = [imageList[0]]
    const column2 = [imageList[1], imageList[2]]
    const column3 = [imageList[3]]

    const customColumns = [column1, column2, column3]

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 1,
    }

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {customColumns.map((column, index) => (
                <Box key={index} >
                    {column.map((img, idx) => (
                    <Box key={idx} mb={4} overflow="hidden" borderRadius="10px">
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
                            boxShadow: 'lg'
                        }}
                    />
                    </Box>
                    ))}
                </Box>
            ))}
        </Masonry>
    )
}

export default ImageGrid