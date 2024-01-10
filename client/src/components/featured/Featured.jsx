import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Varanasi,Rishikesh,Lucknow"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/684940.webp?k=f8eb21b5c72289407585cef7ff7cfc99798ac9238398d7b27c6929ad6c54f78a&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Varanasi</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/xphoto/300x240/140018183.jpg?k=9c5c044264eeae74e558133f082a3449c14b23c4114d26a08a158c515f92f041&o="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Rishikesh</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://cf.bstatic.com/xdata/images/city/square250/684683.webp?k=698b609dd05f38097716054efd8aa7f0af75bee3a241e411e72d8710cc80e020&o= "
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Lucknow</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
