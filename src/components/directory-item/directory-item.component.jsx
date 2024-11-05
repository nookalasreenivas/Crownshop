import { useNavigate } from 'react-router-dom'
import {DirectoryItemContainer, BackgroudImage, Body}from './directory-item.styles'

const DirectoryItem =({categories:{title, imageUrl, route}})=>{
  const navigate = useNavigate();
  const onNavigate = ()=> navigate(route);
    return(
        <DirectoryItemContainer onClick={onNavigate}>
            <BackgroudImage imageUrl={imageUrl} />
          <Body>
            <h1>{title}</h1>
            <p>Shop Now</p>
          </Body>
          </DirectoryItemContainer>
    )
}

export default DirectoryItem