import '../sass/scss/member-group.scss';
import { Link } from 'react-router-dom'

const MemberGroup = () => {
    return (
        <main>
            <section id="member-group">
                <header>
                    <ul>
                        <li><Link to="/member">會員資料</Link></li>
                        <li><Link to="/memberCity">收藏國家</Link></li>
                        <li><Link to="/memberdiary">我的文章</Link></li>
                        <li><Link to="/membersave">收藏文章</Link></li>
                        <li><Link to="/membergroup">活動紀錄</Link></li>
                    </ul>
                </header>
                <div className='m-all-box'>
                    <div className='m-d-title'>
                        <p>活動紀錄</p>
                        {/* <span></span> */}
                    </div>

                    {/* 要換 */}
                    <article>

                    </article>
                </div>
            </section>
        </main>
    )
}

export default MemberGroup