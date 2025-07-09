import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "./Header";
import { FaLocationDot, FaRegClock } from "react-icons/fa6";
import { BiRupee } from "react-icons/bi";
const SingleEvent = () => {
  const eventId = useParams();
  const { data, loading, error } = useFetch(
    `https://bi-assignment1-backend-three.vercel.app/events/${eventId.eventId}`
  );
  console.log(data);
  return (
    <>
      <Header />
      <main className="bg-body-tertiary py-3">
        {loading && <p>Loading...</p>}
        {error && <p>An error occured while fetching event details</p>}
        {data ? (
          <main className="container">
            <div className="row my-2 justify-content-between">
              <div className="col-md-6">
                <h3 className="fw-bolder">{data.eventTitle}</h3>
                <p className="m-0">Hosted By:</p>
                <p>
                  {" "}
                  <strong>{data.hostedBy}</strong>
                </p>
                <img src={data.imageUrl} className="img-fluid my-2" alt="" />
                <h5 className="fw-bold">Details:</h5>
                <p>{data.details}</p>
                <h5 className="fw-bold">Additional Information:</h5>
                <p>
                  <strong>Dress Code: </strong>
                  {data.additionalInfo.dressCode}
                </p>
                <p>
                  <strong>Age Restrictions: </strong>
                  {data.additionalInfo.ageRestrictions}
                </p>
                <h5 className="fw-bold">Event Tags:</h5>
                {data.additionalInfo.eventTags.map((tag) => (
                  <button className="btn btn-danger me-3">{tag}</button>
                ))}
              </div>
              <div className="col-md-4">
                <div className="bg-white rounded p-3">
                  <div className="d-flex align-items-center ">
                    <FaRegClock />
                    <div className="ms-2">
                      <p className="m-0">{data.sessionEndTime}</p>
                      <p className="m-0">{data.sessionStartTime}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center my-3">
                    <FaLocationDot />
                    <div className="ms-2">
                      {data.venueAddress.map((address) => (
                        <p className="m-0">{address}</p>
                      ))}
                    </div>
                  </div>
                  <p className="my-3 d-flex align-items-center">
                    <BiRupee /> {data.eventPrice}
                  </p>
                </div>
                <div className="my-3">
                  <h4>Speakers: ({data.speakers.length})</h4>
                  <div className="row my-3">
                    {data.speakers.map((speaker) => (
                      <div className="col-md-auto ">
                        <div className="border rounded text-center shadow p-3 bg-white">
                          {speaker.speakerImg.length === 0 ? (
                            <p className="fs-1 rounded-circle p-4 border">
                              {speaker.speakerName[0]}
                            </p>
                          ) : (
                            <img
                              src={speaker.speakerImg}
                              alt=""
                              style={{ width: "96px", height: "96px" }}
                              className="rounded-circle"
                            />
                          )}

                          <p className="m-0">
                            <strong>{speaker.speakerName}</strong>
                          </p>
                          <p className="m-0">{speaker.speakerDesignation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <p></p>
        )}
      </main>
    </>
  );
};

export default SingleEvent;
