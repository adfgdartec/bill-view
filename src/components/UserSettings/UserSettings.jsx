// Stylesheet
import styles from './userSettings.module.css';

// Components
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import ActionButton from '../ActionButton/ActionButton';
import TextField from '@mui/material/TextField';

export default function UserSettings() {
    function handlePasswordChange() {

    }

    function handleDeleteAccount() {

    }

    return (
        <div className={styles.container}>
            <div className={styles.settingsContainer}>
                <div className={styles.containerSegment}>
                    <p className={styles.titleText}>Profile Info:</p>
                    <Avatar className={styles.avatar}>H</Avatar>
                    <p>Change Profile Photo</p>
                </div>

                <div className={styles.containerSegment}>
                    <p className={styles.titleText}>Account Settings</p>
                    <p>Username</p>
                    <TextField
                        className={styles.textField}
                        label="Enter your username"
                        value="User Current Username"
                        type="username"
                        size="small"
                        variant="outlined"
                        sx={{
                            marginBottom: "30px"
                        }}
                    />

                    <p>Email</p>
                    <TextField
                        className={styles.textField}
                        label="Change your password"
                        type="User Current Email"
                        size="small"
                        variant="outlined"
                        sx={{
                            marginBottom: "30px"
                        }}
                    />

                    {/* Future Features */}
                    {/* <ChangeColorPicker /> */}

                </div>

                <div className={styles.containerSegment}>
                    <p className={styles.titleText}>Notification Settings</p>
                    <div className={styles.flex}>
                        <Switch />
                        <p>Send Emails</p>
                    </div>
                    <div className={styles.flex}>
                        <Switch />
                        <p>Send Messages</p>
                    </div>
                </div>

                <div className={styles.containerSegment}>
                    <p className={styles.titleText}>Security:</p>
                    <ActionButton content="Change Password" onClick={handlePasswordChange} />
                    <ActionButton content="Delete Account" className={styles.deleteAccount} onClick={handleDeleteAccount} />
                </div>
            </div>
        </div>
    );
}