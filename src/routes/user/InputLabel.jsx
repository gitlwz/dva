import styles from './InputLabel.less';
export default ({ lab, value, placeholder, type, inputChange, showBorder, isButton, buttonClick, buttonName }) => (
    <div className={styles.flex}>
        <label style={{ flex: 1 }} className={styles.label}>{lab}</label>
        {isButton ? <button className={styles.logBtn} style={{ color: '#FFF' }} onClick={() => buttonClick()}>{buttonName}</button> :
            <input value={value} placeholder={placeholder} type={type ? "password" : "text"} className={styles.inputClass} style={{border:showBorder?'1px solid rgba(255,66,0,1)':''}}
                onChange={e => {
                    type ? e.target.type = "password" : e.target.type = "text";
                    inputChange(e.target.value)
                    // this.setState({ password: e.target.value, showWordMsg: false })
                }} />}
    </div>
)

