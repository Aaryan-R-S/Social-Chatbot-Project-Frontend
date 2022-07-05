import leftIcon from './images/left-chevron.png';
import rightIcon from './images/right-chevron.png';

export const carouselStyle = {
    marginTop : '2%',
    borderRadius : '20px',      
    backgroundColor : 'white',
    height : '65vh',
    width : '100vw',
    marginLeft : 'auto',
    marginRight : 'auto',
}; 

export const servicesImageStyle = {
    marginLeft : '20%',
    marginRight : '40%',
    display : 'block',
};

export const servicesProvidedWrapperStyle = { 
    marginTop : '10%', 
    marginBottom : '30%', 
    marginLeft : 'auto',
    marginRight : 'auto',
    width : '80%', 
    height : '50%', 
};

export const servicesProvidedStyle = {
    display : 'table-cell',
    fontFamily : 'Inter',
    fontWeight : '300',
    fontSize : '400%',
    textAlign : 'center'
};

export const chatbotTitle = 'Our Chatbot';

export const chatbotInfo = `AI powered chatbot which suggests remedies and advices to fix the root cause of the problems which people are going through. `;

export const helpTitle = 'Self-Help Material';

export const helpInfo = `We provide a vast number of self-help videos, audios, and suggestions like diets and exercises that helps people to get relief.`;

export const dashboardTitle = 'Personalized Dashboard';

export const dashboardInfo = `View or delete submitted chats on the dashboard. Submitted chats help Mental Health experts to get some knowldege of you before an offline counseling session.`;

export const prevIconStyle = {
    height : '50%',
    width : '80%',
    marginBottom : '50%'
};

export const prevIcon = 
    <div style={prevIconStyle}>
        <img src={leftIcon} alt="left icon" height="100%" width="100%" />
    </div>

export const nextIconStyle = {
    height : '50%',
    width : '80%',
    marginBottom : '50%'
};

export const nextIcon = 
    <div style={nextIconStyle}>
        <img src={rightIcon} alt="right icon" height="100%" width="100%" />
    </div>