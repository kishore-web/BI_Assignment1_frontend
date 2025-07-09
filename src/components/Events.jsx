import React, { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
const Events = ({ searchQuery }) => {
  const [selectEventType, setSelectEventType] = useState("both");
  const { data, loading, error } = useFetch(
    "https://bi-assignment1-backend-three.vercel.app/events"
  );
  // console.log(data);

  const eventArr = data?.events || [];
  console.log(eventArr);

  const selectedEventTypeArr =
    selectEventType === "both" || selectEventType === ""
      ? eventArr
      : eventArr.filter((item) =>
          selectEventType === "online"
            ? item.eventType === true
            : item.eventType === false
        );
  const searchByTitleTags = selectedEventTypeArr.filter((item) => {
    let searchText = searchQuery?.toLowerCase() || "";
    let eventTitleArr = item.eventTitle.toLowerCase().includes(searchText);
    let tagsArr = item.additionalInfo?.eventTags || [];
    let eventTags = tagsArr.some((tag) =>
      tag.toLowerCase().includes(searchText)
    );

    return eventTitleArr || eventTags;
  });

  return (
    <div className="container my-4">
      <section className="row">
        <div className="col-md-10">
          <h1>Meetup Events</h1>
        </div>
        <div className="col-md-2">
          <select
            name="eventType"
            id=""
            className="form-select"
            onChange={(e) => setSelectEventType(e.target.value)}
          >
            <option value="">Select Event Type</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="both">Both</option>
          </select>
        </div>
      </section>
      {loading && <p>Loading...</p>}
      {error && <p>An error occured while fetching data</p>}
      {!loading && !error && (
        <section className="row p-4 g-5">
          {searchByTitleTags.length > 0 ? (
            searchByTitleTags.map((item) => (
              <Link
                to={`/events/${item._id}`}
                className="col-md-4 text-decoration-none"
                key={item._id}
              >
                <div className="card border-0 position-relative bg-body-tertiary">
                  <img
                    src={item.imageUrl}
                    className="card-img-top"
                    alt={item.eventTitle}
                  />
                  <div className="card-body p-0">
                    <p className="m-0">{item.eventTime}</p>
                    <h4 className="card-text fw-bolder">{item.eventTitle}</h4>
                  </div>
                  <button className="btn btn-light position-absolute top-0 start-0 mt-2 ms-2">
                    {item.eventType ? "Online" : "Offline"} Event
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p>No events match your search</p>
          )}
        </section>
      )}
    </div>
  );
};

export default Events;
