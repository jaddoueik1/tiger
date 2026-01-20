export interface Evaluation {
	_id: string;
	studentId: string;
	classTemplateId: {
		_id: string;
		title: string;
	};
	quizId: {
		_id: string;
		title: string;
	};
	answers: {
		questionId: string;
		answer: string;
		score: number;
		notes?: string;
	}[];
	totalScore: number;
	maxScore: number;
	notes?: string;
	createdBy: {
		_id: string;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}
