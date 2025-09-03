import '../sass/scss/group3.scss'
import { Link } from "react-router-dom"
import { useState } from "react"

const Group3 = () => {
    return (
        <main>

            {/* 大標Slogan */}
            <section id='create-group'>
                <div className='create-group-Slogan'>
                    <h3>Right now! Start!</h3>
                    <div className="line"></div>
                    <h2>發起揪團吧！</h2>
                    </div>
            </section>

            {/* 想揪什麼團 */}
            <form class="form-container" id="createGroupForm"/>
            
            <div class="form-group">
                <label class="form-label">想揪甚麼團<span class="required">*</span></label>
                <div class="category-options">
                    <div class="category-option">
                        <input type="radio" id="food" name="category" value="找吃飯夥伴" required/>
                        <label for="food">找吃飯夥伴</label>
                    </div>
                    <div class="category-option">
                        <input type="radio" id="work" name="category" value="找工作夥伴" required/>
                        <label for="work">找工作夥伴</label>
                    </div>
                    <div class="category-option">
                        <input type="radio" id="explore" name="category" value="找踩點夥伴" required/>
                        <label for="explore">找踩點夥伴</label>
                    </div>
                    <div class="category-option">
                        <input type="radio" id="roommate" name="category" value="找合租室友" required/>
                        <label for="roommate">找合租室友</label>
                    </div>
                    <div class="category-option">
                        <input type="radio" id="chill" name="category" value="找chill伴" required/>
                        <label for="chill">找chill伴</label>
                    </div>
                </div>
                <div class="error-message">請選擇一個類型</div>
            </div>
        </main>
    )
}
export default Group3