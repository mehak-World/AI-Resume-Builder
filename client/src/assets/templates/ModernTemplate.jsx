import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		return new Date(year, month - 1).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short"
		});
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800">
			{/* Header */}
			<header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
				<h1 className="text-4xl font-light mb-3">
					{data.personalInfo?.full_name || "Your Name"}
				</h1>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm ">
					{data.personalInfo?.email && (
						<div className="flex items-center gap-2">
							<Mail className="size-4" />
							<span>{data.personalInfo.email}</span>
						</div>
					)}
					{data.personalInfo?.phone && (
						<div className="flex items-center gap-2">
							<Phone className="size-4" />
							<span>{data.personalInfo.phone}</span>
						</div>
					)}
					{data.personalInfo?.location && (
						<div className="flex items-center gap-2">
							<MapPin className="size-4" />
							<span>{data.personalInfo.location}</span>
						</div>
					)}
					{data.personalInfo?.linkedin && (
						<a target="_blank" href={data.personalInfo?.linkedin} className="flex items-center gap-2">
							<Linkedin className="size-4" />
							<span className="break-all text-xs">{data.personalInfo.linkedin.split("https://www.")[1] ? data.personalInfo.linkedin.split("https://www.")[1] : data.personalInfo.linkedin}</span>
						</a>
					)}
					{data.personalInfo?.website && (
						<a target="_blank" href={data.personalInfo?.website} className="flex items-center gap-2">
							<Globe className="size-4" />
							<span className="break-all text-xs">{data.personalInfo.website.split("https://")[1] ? data.personalInfo.website.split("https://")[1] : data.personalInfo.website}</span>
						</a>
					)}
				</div>
			</header>

			<div className="p-8">
				{/* Professional Summary */}
				{data.summary && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Summary
						</h2>
						<p className="text-gray-700 ">{data.summary}</p>
					</section>
				)}

				{/* Experience */}
				{data.experiences && data.experiences.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">
							Experience
						</h2>

						<div className="space-y-6">
							{data.experiences.map((exp, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200">

									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
											<p className="font-medium" style={{ color: accentColor }}>{exp.company}</p>
										</div>
										<div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
											{formatDate(exp.startDate)} - {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
										</div>
									</div>
									{exp.jobDescription && (
										<div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line">
											{exp.jobDescription}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Projects */}
				{data.projects && data.projects.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
							Projects
						</h2>

						<div className="space-y-6">
							{data.projects.map((p, index) => (
								<div key={index} className="relative pl-6 border-l border-gray-200" style={{borderLeftColor: accentColor}}>


									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
										</div>
									</div>
									{p.description && (
										<div className="text-gray-700 leading-relaxed text-sm mt-3">
											{p.description}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				<div className="grid sm:grid-cols-2 gap-8">
					{/* Education */}
					{data.education && data.education.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Education
							</h2>

							<div className="space-y-4">
								{data.education.map((edu, index) => (
									<div key={index}>
										<h3 className="font-semibold text-gray-900">
											{edu.degree} {edu.field && `in ${edu.field}`}
										</h3>
										<p style={{ color: accentColor }}>{edu.institution}</p>
										<div className="flex justify-between items-center text-sm text-gray-600">
											<span>{formatDate(edu.graduation_date)}</span>
											{edu.gpa && <span>GPA: {edu.gpa}</span>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Skills */}
					{data.skills && data.skills.length > 0 && (
						<section>
							<h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200">
								Skills
							</h2>

							<div className="flex flex-wrap gap-2">
								{data.skills.map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm text-white rounded-full"
										style={{ backgroundColor: accentColor }}
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}

export default ModernTemplate;