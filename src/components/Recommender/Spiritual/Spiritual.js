import { React } from 'react';
import {Container, Row } from 'react-bootstrap';
import yoga from '../images/spiritual.jpg'
import CardInfo from '../../Card/CardInfo';

const Spiritual = () => {
    const largeHeading = "Spiritual Texts"

    const headings = [
        'Rigveda',
        'Rāmāyaṇa',
        'Bhagavad Gita'
    ]

    const content = [
        'The second phase of the Vedic text, called the Brāhmaṇas, concerns the sacrificial ritual (yajña) that lay at the heart of Vedic religion. It was by the proper performance and recitation of this ritual that order and stability were thought to be established in the world. The third phase is the Āraṇyakas, ‘forest-texts’, which represented a meditative departure away from the external performance of the Vedic sacrificial ritual. A tendency had developed among some to internalise the sacrifice within the inner self (ātman), which was eventually perceived as spiritual, and as distinct from the body and other forms of matter. This tendency was taken further in the fourth and final phase of the Vedic corpus, the Upaniṣads. In some passages of the Upaniṣads, the One, mentioned in the first phase of the Veda and now known as Brahman, was identified as a single, supra-personal, indivisible spiritual Self, undergirding all change and difference in our world; in other passages, the One was given a more personal and divine status as īśvara (‘God’), distinct from but supporting the existence of individual selves and the rest of finite being. From early times the content of the Veda was divided under four genres of text into the Ṛg Veda, the Yajur Veda, the Sāma Veda and the Atharva Veda, so it is quite common to speak in terms of the ‘four Vedas.’ The correct performance of Vedic sacrificial ritual was thought to be so important for ordering the relationships between humans and the world in the early stages of Hinduism, that another cluster of texts called the Vedāṅgas emerged. These fell under the heading of ‘smṛti’, the not infallible but still authoritative ‘recall’ of received wisdom. The Vedāṅgas were concerned in different ways with the cadence, origin, meaning and proper articulation of Vedic (Sanskrit) terms used for the ritual, the appropriate times for the ritual’s performance, and so on. As Vedāṅgas or ‘limbs of the Veda’, these texts were envisaged as protecting and nurturing the body that was the Veda. Other smṛti compositions also developed from the beginning of the Common Era in conjunction with the Vedic canon. Important among these were texts that codified a developing and central concept of Hinduism, dharma. This concept deals with the right order between the different strata and birth-groups (varṇa and jāti) of Hindu society (which we lump together under the term ‘caste’) and its male and female members. It was believed that these texts, through their prescriptions and prohibitions, elaborated on the social implementation of Vedic order. Following the analogy of the banyan tree, all these different compositions on dharma may be viewed as contributing to the sap coursing through the Hindu banyan, helping bring together its wide-ranging parts under a common but continuously challenged and debated theme.',

        'The Rāmāyaṇa consists of seven books and recounts the adventures of the exiled king Rāma and his various companions as they make their way to the island-kingdom of Laṅkā – off the southern tip of India – to rescue Rāma’s wife Sītā, who had been abducted by Rāvaṇa, the ten-headed ogre-king of Laṅkā. For a great many Hindus, the Rāmāyaṇa, and devotion to the avatar (the chief representation of the Supreme Being in human form) Rāma offers an accessible path to salvation. Thus, the Rāmāyaṇa also becomes an alternative source of Vedic instruction. Like the proliferating banyan, both epics have developed in different Indian vernaculars, with multiple versions of their storylines scattered about the cultural landscape of Hinduism. Under this rubric falls Tulsidas’ Rāmcaritmānas, which was composed in verse in 16th century in an early dialect of Hindi, and which has become the re-telling of the Rāma story for a large proportion of north Indians. Through the multiple re-tellings of the epics Hindus can access the characters and teachings via different historical and linguistic pathways. Hindus, in general, have not been minded to seek out ‘definitive’ versions of post-Vedic sacred texts. In fact, the interpretation of sacred texts in Hinduism, whether these have been categorised as śruti or smṛti, has always been a matter for earnest discussion and debate for Hindu thinkers down the ages.',

        'Two other major contributors in this respect were dharma-texts of a different order, the Mahābhārata (‘The Great Tale of the Bhāratas’) and the Rāmāyaṇa (‘The Coming of Rāma’). Both compositions were originally compiled in Sanskrit verse over several hundreds of years, beginning from about the middle of the first millennium BCE. In eighteen books the Mahābhārata narrates the story of the rivalry between two groups of cousin warriors, the Pāṇḍavas and the Kauravas. With the aid of hundreds of supporting characters and intriguing sub-plots, the story imparts many teachings about the nature of dharma. Embedded in book 6 of the Mahābhārata is perhaps the most famous devotional sacred text of Hinduism, the 700 verse Bhagavad Gītā, or ‘Song of (Krishna as) God’. The Gītā, as it is often called, mainly contains teachings by Krishna (also spelt Kṛṣṇa), as Supreme Being, to his friend and disciple Arjuna about how to attain union with him in his divine state. The Gītā, though technically smṛti, is usually treated as equivalent to śruti by its followers – hence its importance. The Mahābhārata has been called the ‘fifth Veda’ in many Hindu circles, in the belief that it cumulatively teaches, in a more accessible way, the essential truths of the Veda.'
    ]


    return (
        <div>
            <h1 style={{textAlign:"center", fontSize:"3rem", marginTop:"2rem", marginBottom:"1rem"}}>{largeHeading}</h1>
            <div style={{textAlign:"center", margin:"auto"}}>
                <img src={yoga} alt="food_image" height="auto" width="600px"/>
            </div>
            <Container  style = {{padding : '5%', paddingTop:'0%'}}>
                { headings.map( (heading, index) => {
                    const paragraph = content[index];
                    return (

                    <Row key={heading}
                        style={{
                            padding:'1%',
                        }}>
                        <CardInfo
                            title={heading}
                            text={paragraph}/>
                    </Row>
                    );
                })}
            </Container>
        </div>
    );
};

export default Spiritual;