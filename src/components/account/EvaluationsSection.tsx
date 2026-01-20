import { useMyEvaluations } from '@/hooks/useApi';
import { motion } from 'framer-motion';
import { Award, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function EvaluationsSection() {
    const { data: evaluations, isLoading } = useMyEvaluations();
    const [expandedEval, setExpandedEval] = useState<string | null>(null);

    const toggleEval = (id: string) => {
        setExpandedEval(expandedEval === id ? null : id);
    };

    if (isLoading) return <div className="text-center py-4 text-text-muted">Loading evaluations...</div>;

    if (!evaluations || evaluations.length === 0) return null;

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-xl font-bold mb-4">My Evaluations</h2>
            <div className="space-y-4">
                {evaluations.map((evalItem) => (
                    <div key={evalItem._id} className="bg-surface rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleEval(evalItem._id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-text">{(evalItem.quizId as any)?.title || 'Quiz'}</h3>
                                    <div className="text-sm text-text-muted">
                                        {(evalItem.classTemplateId as any)?.title || 'Class'} • {new Date(evalItem.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <div className="text-2xl font-bold text-primary">{evalItem.totalScore} / {evalItem.maxScore}</div>
                                    <div className="text-xs text-text-muted">Score</div>
                                </div>
                                {expandedEval === evalItem._id ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                            </div>
                        </div>

                        {expandedEval === evalItem._id && (
                            <div className="px-5 pb-5 pt-0 border-t border-gray-100 bg-gray-50/50">
                                <div className="mt-4 sm:hidden mb-4">
                                    <div className="text-2xl font-bold text-primary">{evalItem.totalScore} / {evalItem.maxScore}</div>
                                    <div className="text-xs text-text-muted">Score</div>
                                </div>

                                {evalItem.notes && (
                                    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
                                        <h4 className="font-medium text-sm text-text-muted mb-1">Coach Feedback</h4>
                                        <p className="text-text">{evalItem.notes}</p>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <h4 className="font-medium text-sm text-text-muted">Details</h4>
                                    {evalItem.answers.map((ans, idx) => (
                                        <div key={ans.questionId || idx} className="flex justify-between items-start bg-white p-3 rounded border border-gray-200 text-sm">
                                            <span>Question {idx + 1}</span>
                                            <span className={`font-medium ${ans.score > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                {ans.score > 0 ? 'Correct' : 'Incorrect'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
