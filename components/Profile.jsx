import PromptCard from "./PromptCard";

function Profile({ name, description, data, handleEdit, handleDelete }) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{description}</p>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            post={post}
            key={post._id}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
