import { Link } from 'react-router-dom';
import { useGetProfessional } from '../hooks/useContent';

const HomeTrustAnchor = () => {
  const { profile } = useGetProfessional();

  if (!profile) {
    return null;
  }

  return (
    <section className="home-trust-anchor" aria-label="About the founder">
      <div className="home-trust-anchor__media">
        <img
          src={profile.photo}
          alt={profile.photoAlt}
          className="home-trust-anchor__photo"
          width={88}
          height={110}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="home-trust-anchor__copy">
        <p className="home-trust-anchor__eyebrow">Built by</p>
        <h2 className="home-trust-anchor__name">{profile.name}</h2>
        <p className="home-trust-anchor__meta">
          {profile.title} · {profile.experience}
        </p>
        <p className="home-trust-anchor__bio">{profile.trustBio}</p>
      </div>

      <div className="home-trust-anchor__action">
        <Link to="/studio/get-professional" className="home-trust-anchor__link">
          Meet the founder
        </Link>
      </div>
    </section>
  );
};

export default HomeTrustAnchor;