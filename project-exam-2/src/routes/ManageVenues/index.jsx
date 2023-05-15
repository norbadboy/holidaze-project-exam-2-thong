import { useVenues } from "../../contexts/venuesContext";
import { useForm, useFieldArray } from "react-hook-form";
import { getVenuesByProfile } from "../../api/venues/getByProfile.mjs";
import { useUser } from "../../contexts/userContext";
import { useEffect, useState } from "react";

function ManageVenues() {
  const { addVenue } = useVenues();
  const { user } = useUser();
  const [venues, setVenues] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const onSubmit = (data) => {
    // Convert price, maxGuests, and rating values to numbers
    data.price = Number(data.price);
    data.maxGuests = Number(data.maxGuests);
    data.rating = Number(data.rating);
    addVenue(data);
    // Optionally, you can redirect the user to a different page after successful submission
  };

  useEffect(() => {
    const fetchVenues = async () => {
      const userVenues = await getVenuesByProfile(user.name);
      console.log(userVenues);
      setVenues(userVenues);
    };

    fetchVenues();
  }, [user.name]);

  return (
    <div className="mt-5">
      <h1 className="pt-4">Create Venue</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>Description:</label>
          <textarea {...register("description", { required: true })}></textarea>
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <label>Media:</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`media.${index}`)}
                defaultValue={field.value} // Populate initial values
              />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ value: "" })} // Add a new media input field
          >
            Add Media
          </button>
        </div>
        <div>
          <label>Price:</label>
          <input type="number" {...register("price", { required: true })} />
          {errors.price && <span>This field is required</span>}
        </div>
        <div>
          <label>Max Guests:</label>
          <input type="number" {...register("maxGuests", { required: true })} />
          {errors.maxGuests && <span>This field is required</span>}
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" {...register("rating")} />
        </div>
        <div>
          <label>Meta:</label>
          <div>
            <label>
              <input type="checkbox" {...register("meta.wifi")} />
              Wifi
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register("meta.parking")} />
              Parking
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register("meta.breakfast")} />
              Breakfast
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" {...register("meta.pets")} />
              Pets
            </label>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
      <div>
        <h3>
          Venues created by {user.name} ({venues.length})
        </h3>
        {venues.map((venue, index) => (
          <div key={index}>
            <h4>{venue.name}</h4>
            <p>{venue.description}</p>
            <p>Price: {venue.price}</p>
            <p>Max Guests: {venue.maxGuests}</p>
            <p>Rating: {venue.rating}</p>
            <p>Wifi: {venue.meta.wifi ? "Yes" : "No"}</p>
            <p>Parking: {venue.meta.parking ? "Yes" : "No"}</p>
            <p>Breakfast: {venue.meta.breakfast ? "Yes" : "No"}</p>
            <p>Pets: {venue.meta.pets ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageVenues;
