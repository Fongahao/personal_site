import '../styles/components/content-header.css';
import {
    CalendarOutlined,
    FolderOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const ContentHeader = (props) => {
    return (
        <div className="list-icon center">
            <span>
                <CalendarOutlined /> {props.addTime}
            </span>
            <span>
                <FolderOutlined /> {props.typeName}
            </span>
            <span>
                <TeamOutlined /> {props.view_count}人
            </span>
        </div>
    )
}

export default ContentHeader;