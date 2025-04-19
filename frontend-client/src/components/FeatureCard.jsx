import PropTypes from 'prop-types';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-10 m-5 w-[550px] h-[350px] rounded-lg shadow-md text-left color-white flex flex-col justify-center" style={{backgroundColor: '#F4CA44'}}>
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="font-bold text-2xl mb-2">{title}</h3>
      <p className="text-lg text-justify mt-4">{description}</p>
    </div>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};


export default FeatureCard;
