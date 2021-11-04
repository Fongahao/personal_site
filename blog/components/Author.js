import { Avatar, Divider } from 'antd';
import '../styles/components/author.css';
import Image from 'next/image'
// import profilePic from '/profile.png'
import {
    GithubOutlined,
    QqOutlined,
    WechatOutlined,
} from '@ant-design/icons';

const Author = () => {

    const iconStyle = { fontSize: 28 };

    return (
        <div className="author-div comm-box">
            <div>
                {/* <Image
                    src='/profile.png'
                    alt="Picture of the author"
                    width={500}
                    height={500}
                /> */}
                <Avatar
                    size={100}
                    src='/profile.jpg'
                    draggable={true}
                />
            </div>
            <div className="author-introduction">
                Fong阿蚝的个人网站
                <Divider>社交账号</Divider>
                <GithubOutlined style={iconStyle} className="account" />
                <QqOutlined style={iconStyle} className="account" />
                <WechatOutlined style={iconStyle} className="account" />
            </div>
        </div>
    )

}

export default Author