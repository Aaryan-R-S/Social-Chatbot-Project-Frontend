import { React } from 'react';
import {Container, Row } from 'react-bootstrap';
import food from '../images/food.jpg'
import CardInfo from '../../Card/CardInfo';

const Diet = () => {
    const largeHeading = "Recommended Diet"
    const headings = [
        'Base your meals on higher fibre starchy carbohydrates',
        'Eat lots of fruit and veg',
        'Cut down on saturated fat and sugar',
        'Eat less salt',
        'Do not skip breakfast'
    ]
    
    const content = [
        'Starchy carbohydrates should make up just over a third of the food you eat. They include potatoes, bread, rice, pasta and cereals. Choose higher fibre or wholegrain varieties, such as wholewheat pasta, brown rice or potatoes with their skins on. They contain more fibre than white or refined starchy carbohydrates and can help you feel full for longer.',

        'It\'s recommended that you eat at least 5 portions of a variety of fruit and veg every day. They can be fresh, frozen, canned, dried or juiced.',

        'On average, men should have no more than 30g of saturated fat a day. On average, women should have no more than 20g of saturated fat a day. Try to cut down on your saturated fat intake and choose foods that contain unsaturated fats instead, such as vegetable oils and spreads, oily fish and avocados.',

        'Eating too much salt can raise your blood pressure. Even if you do not add salt to your food, you may still be eating too much. About three-quarters of the salt you eat is already in the food when you buy it, such as breakfast cereals, soups, breads and sauces.       Adults and children aged 11 and over should eat no more than 6g of salt (about a teaspoonful) a day. Younger children should have even less.',

        'A healthy breakfast high in fibre and low in fat, sugar and salt can form part of a balanced diet, and can help you get the nutrients you need for good health. A wholegrain lower sugar cereal with semi-skimmed milk and fruit sliced over the top is a tasty and healthier breakfast.'
    ]


    return (
        <div>
            <h1 style={{textAlign:"center", fontSize:"3rem", marginTop:"2rem", marginBottom:"1rem"}}>{largeHeading}</h1>
            <div style={{textAlign:"center", margin:"auto"}}>
                <img src={food} alt="food_image" height="auto" width="600px"/>
            </div>
            <Container 
                style = {{padding : '5%', paddingTop:'1%'}}>

                { headings.map( (heading, index) => {
                    const paragraph = content[index];
                    return (

                    <Row key={heading}
                        style={{
                            padding: '1%',
                        }}>
                        <CardInfo 
                            title={heading}
                            text={paragraph}    />
                    </Row>
                    );
                })}

            </Container>
        </div>
    );
};

export default Diet;