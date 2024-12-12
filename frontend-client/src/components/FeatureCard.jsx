const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg shadow-md text-center" style={{backgroundColor: '#F4CA44'}}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
