import youtube_icon from "../assets/youtube_icon.png"
import twitter_icon from "../assets/twitter_icon.png"
import instagram_icon from "../assets/instagram_icon.png"
import facebook_icon from "../assets/facebook_icon.png"


const Footer = () => {
  return (
    <div className="px-[30px] py-[4%] mx-auto max-w-[1000px] text-neutral-500 text-sm">
      <div className="flex gap-8">
        <img src={youtube_icon} alt="" className="size-6 cursor-pointer"/>
        <img src={instagram_icon} alt="" className="size-6 cursor-pointer" />
        <img src={twitter_icon} alt="" className="size-6 cursor-pointer" />
        <img src={facebook_icon} alt="" className="size-6 cursor-pointer"/>
      </div>
      <ul className="grid sm:grid-cols-[auto_auto] md:grid-cols-[auto_auto_auto] lg:grid-cols-[auto_auto_auto_auto] gap-[15px] mt-4 mb-8">
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Perferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p>© 1997-2025 Netflic, Inc.</p>
    </div>
  )
}

export default Footer