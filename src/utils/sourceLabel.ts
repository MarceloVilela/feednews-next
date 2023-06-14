const sourceLabel = (link: string) => String(link.replace('www.', '')).split('/')[2];

export default sourceLabel;
