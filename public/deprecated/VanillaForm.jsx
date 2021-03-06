import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { baseURL, config } from "../../src/services";

function Form(props) {
  const { setToggleRender, cardList } = props;
  console.log(props);
  // states
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [alternativeLink, setAlternativeLink] = useState("");
  // react router dom methods
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    // if theres an id in the url and the data array is bigger than 0
    if (params.id && cardList.length > 0) {
      // find the card with the corresponding id in params
      const cardToFind = cardList.find((card) => card.id === params.id);
      // destructure fields of card to find
      const { fields } = cardToFind;
      // if the card exists, populate the states
      if (cardToFind) {
        setProfilePic(fields.profilePic);
        setName(fields.name);
        setBrand(fields.brand);
        setDescription(fields.description);
        setHighlights(fields.highlights);
        setEmail(fields.email);
        setLinkedin(fields.linkedin);
        setAlternativeLink(fields.alternativeLink);
      }
    }
  }, [params.id, props.cardList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCard = {
      profilePic,
      name,
      brand,
      description,
      highlights,
      email,
      alternativeLink,
    };
    // if url contains parameters, the form will render with pre-filled data and submit to api using PUT instead
    if (params.id) {
      const specificURL = `${baseURL}/${params.id}`;
      await axios.put(specificURL, { fields: newCard }, config);
    } else {
      // make an axios post request to the baseurl, attached with data to add & auth config
      await axios.post(baseURL, { fields: newCard }, config);
    }

    // triggers redirect after 1 second
    setToggleRender((curr) => !curr);
    setTimeout(() => {
      history.push("/");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="profilePic">Link to your profile picture:</label>
      <input
        type="text"
        id="profilePic"
        placeholder="URL"
        value={profilePic}
        onChange={(e) => setProfilePic(e.target.value)}
      />
      <label htmlFor="name">My name is:</label>
      <input
        required
        type="text"
        id="name"
        placeholder="First and last name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="brand">What would you want someone to know on first impressions?</label>
      <input
        required
        type="text"
        id="brand"
        placeholder="1-2 sentences"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />

      <label htmlFor="description">A short paragraph going in-depth about you and who you are!</label>
      <textarea
        required
        id="description"
        placeholder="2+ sentences"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label htmlFor="highlights">What are some things you're proud of or consider highlights about you?</label>
      <textarea
        required
        id="highlights"
        placeholder="Sentence / List"
        value={highlights}
        onChange={(e) => setHighlights(e.target.value)}
      ></textarea>

      <label htmlFor="email">E-mail:</label>
      <input
        required
        type="email"
        id="email"
        placeholder="rainingcats101@catmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="linkedin">LinkedIn (URL):</label>
      <input
        required
        type="text"
        id="linkedin"
        placeholder="URL"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
      />

      <label htmlFor="alternativeLink">Alternative Link:</label>
      <input
        type="text"
        id="alternativeLink"
        placeholder="URL"
        value={alternativeLink}
        onChange={(e) => setAlternativeLink(e.target.value)}
      />
      <button>Create Your Card</button>
    </form>
  );
}

export default Form;
